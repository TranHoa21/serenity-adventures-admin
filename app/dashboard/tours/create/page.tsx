"use client"

import React, { useState, ChangeEvent, FormEvent, } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { PlaceSelect } from "./places"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "../../../style/tour/create.scss";

const ClientComponent = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [placesName, setPlacesName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();
    const [price, setPrice] = useState<number>(0);

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handlePlacesChange = (value: string) => {
        setPlacesName(value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handlePriceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = parseFloat(e.target.value);
        setPrice(value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price.toString());
            formData.append('places_name', placesName);
            formData.append('description', content);
            if (image) {
                formData.append('file', image);
            }

            const response = await axios.post('http://localhost:3001/api/v1/tour', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('check:', title, placesName, content, image);
            router.push('/tours');
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <div>
            <h1>Create New Tour</h1>
            <span className="in-title"> Title:
                <textarea
                    className="inputText"
                    value={title}
                    onChange={handleTitleChange}
                    autoComplete="title"
                    placeholder=""
                    required
                />
            </span>

            <PlaceSelect onChange={handlePlacesChange} value={placesName} />
            <img src={image ? URL.createObjectURL(image) : ""} className="img-tour" />

            <input className="image-file" type="file" name="image" onChange={handleImageChange} />

            <div className="description">
                <SunEditor
                    setOptions={{
                        buttonList: [
                            ['formatBlock', 'bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'list', 'indent', 'align'],
                            ['fontColor', 'hiliteColor', 'textStyle'],
                            ['link', 'image', 'video'],
                            ['removeFormat']
                        ]
                    }}
                    onChange={(content) => setContent(content)}
                    setContents={content}
                    placeholder="Start writing..."
                />
            </div>
            <button className="btn" type="submit" onClick={handleSubmit}>Save</button>
            <span className='in-title'>Price:
                <textarea
                    className='price'
                    onChange={handlePriceChange}
                    value={price.toString()}
                    autoComplete="price"
                    placeholder=""
                    required
                />
            </span>
        </div>
    );
};

export default ClientComponent;
