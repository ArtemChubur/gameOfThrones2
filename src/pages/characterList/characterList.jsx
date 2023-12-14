import React, {useEffect} from 'react';
import {getAllCharacters} from "../../request/getAllCharacters/getCharacters";
import {useDispatch, useSelector} from "react-redux";
import {setData} from "../../features/data/dataSlice";
import {useNavigate} from 'react-router-dom'
import {setId} from "../../features/id/idSlice";
import './characterList.css'

function CharacterList(props) {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.data.data)

    const navigate = useNavigate()

    function goToDetail(item) {
        dispatch(setId(item.id))
        navigate('/detail')
    }

    useEffect(() => {
        (async  () => {
            const result = await getAllCharacters()
            dispatch(setData(result))
        }) ()
    }, [])
    return (
        <div className='characterList'>
            <h2>thronesapi</h2>
            <div className='main'>
                <div className='charakList'>
                    <table>
                        <tbody>
                            <tr className='tableHeader'>
                                <td>ID</td>
                                <td>Name</td>
                                <td></td>
                            </tr>
                            {data.map((item, idx) => {
                                return (
                                    <tr key={idx} className='tableHeros' onClick={() => {
                                        localStorage.setItem('id', `${idx}`)
                                        goToDetail(item)
                                    }}>
                                        <td>{idx}</td>
                                        <td>{item.fullName}</td>
                                        <td><img className='img1' src={item.imageUrl} alt="" /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CharacterList;