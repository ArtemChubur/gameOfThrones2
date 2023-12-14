import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOneCharacter} from "../../request/getOneCharacter/getOneCharacter";
import './detailInfo.css'
import {useNavigate} from "react-router-dom";
import {setDetail} from "../../features/detail/detail";

function DetailInfo(props) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const id = useSelector((state) => state.id.id)
    const detail = useSelector((state) => state.detail.detail)

    const idStorage = localStorage.getItem('id')

    async function getCharak(id, idStorage) {
        try {
            const result = await getOneCharacter(id)
            dispatch(setDetail(result))
            setLoading(false)
        } catch (e) {
            const status = e.request.status
            if (status === 400) {
                if (idStorage !== null) {
                    getCharak(idStorage)
                    console.clear()
                } else {
                    navigate('/')
                }
            } else if (status === 0) { // в этой API походу вместо кода 404 стоит 0
                alert('Ошибка на стороне сервер. Попробуйте позже.')
                navigate('/')
            }
        }
    }

    useEffect(() => {
        getCharak(id, idStorage)
    }, [])

    return (
        <div className='da'>
            {loading ?
                <div>
                    <p className='loader'>Loading...</p>
                </div>
                :
                <div>
                    <h2>{detail.fullName}</h2>
                    <div className='detailCard'>
                        <div>
                            <img className='mainImg' src={detail.imageUrl} alt="" />
                        </div>
                        <div className='info'>
                            <div className='table'>
                                <div className='strTable'>
                                    <p>ID:</p>
                                    <p>First Name:</p>
                                    <p>Last Name:</p>
                                    <p>Full Name:</p>
                                    <p>Title:</p>
                                    <p>Family:</p>
                                    <p>Image:</p>
                                    <p>Image URL:</p>
                                </div>
                                <div className='strTable'>
                                    <p>{detail.id}</p>
                                    <p>{detail.firstName}</p>
                                    <p>{detail.lastName}</p>
                                    <p>{detail.fullName}</p>
                                    <p>{detail.title}</p>
                                    <p>{detail.family}</p>
                                    <p>{detail.image}</p>
                                    <p><a rel="noreferrer" href={detail.imageUrl} target='_blank'>{detail.imageUrl}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DetailInfo;