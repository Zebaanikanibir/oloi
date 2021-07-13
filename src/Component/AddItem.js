import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faCog } from '@fortawesome/free-solid-svg-icons'
import './AddItem.css';

function AddItem() {
    const getLocalItmes = () => {
        let list = localStorage.getItem('lists');
        console.log(list);

        if (list) {
            return JSON.parse(localStorage.getItem('lists'));
        } else {
            return [];
        }
    }

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const handleChange = (e) => {
        setInputData(e.target.value)

    }
    const AddItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if (inputData && !toggleSubmit) {

            setToggleSubmit(true);

            setInputData('');

        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }


    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))

    }, [items])


    return (
        <div className="body">
            <div className="main-div">
                <div className="child-div">

                    <div className="all">
                        <ul className="lists">
                            <li id="list">Publish</li>
                            {inputData ?
                                <li>savings</li> : <li>saved</li>
                            }
                        </ul>
                        <ul className="lists">
                            <li className="list"> <FontAwesomeIcon icon={faCog} /></li>
                            <li className="list"> <FontAwesomeIcon icon={faTimes} /></li>
                        </ul>
                    </div>

                    <div className="showItems">

                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h6>{elem.name}</h6>
                                        <div className="todo-btn">
                                            <FontAwesomeIcon onClick={() => deleteItem(elem.id)} icon={faTimes} title="Delete Item" />

                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>

                    <div className="addItems">
                        <input type="text" placeholder="Start typing..And We shall  make suggestions"
                            className="input"
                            onChange={handleChange}
                            value={inputData}
                            name="name"

                        /> <br />


                        <FontAwesomeIcon onClick={AddItem} icon={faPlus} />









                    </div>




                </div>
            </div>
        </div>
    );
}

export default AddItem;
