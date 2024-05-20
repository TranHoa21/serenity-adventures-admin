"use client"

import React, { useState, useRef, ChangeEvent, FormEvent, } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { PlaceSelect } from "./places"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "../../../style/tour/create.scss";

const ClientComponent = () => {
    const [value, setValue] = useState('');
    const reactQuillRef = useRef<ReactQuill>(null);
    const [title, setTitle] = useState('');
    const [places_name, setPlaces_name] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();
    const [price, setPrice] = useState<number>(0);


    const onChange = (newValue: string, delta: any, source: any, editor: any) => {
        if (source === 'user') {
            setValue(newValue);
            const text = editor?.getText() || '';
            setDescription(text);
        }
    };

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handlePlacesChange = (value: string) => {
        setPlaces_name(value);
    };
    const handlePriceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = parseFloat(e.target.value); // Chuyển đổi giá trị từ string sang number
        setPrice(value);
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price.toString());
            formData.append('places_name', places_name);
            formData.append('description', value);
            if (image) {
                formData.append('file', image);
            }

            const response = await axios.post('https://serenity-adventures-demo.onrender.com//api/v1/tour', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đảm bảo cài đặt 'Content-Type' là 'multipart/form-data'
                }
            });
            console.log('check:', title, places_name, value, image, price);
            router.push('/dashboard/tours');
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };



    return (

        <div>
            <h1>Create New Tour  </h1>

            <span className="in-title"> Title:
                <textarea
                    className="inputText"
                    value={title}
                    onChange={handleTitleChange}
                    autoComplete="title"
                    placeholder=""
                    required />
            </span>

            <PlaceSelect onChange={handlePlacesChange} value={places_name} />
            <img src={image ? URL.createObjectURL(image) : ""} className="img-tour" />

            <input className="image-file" type="file" name="image" onChange={handleImageChange} />

            <div className="description">
                <ReactQuill
                    ref={reactQuillRef}
                    theme="snow"
                    placeholder="Start writing..."
                    modules={{
                        toolbar: {
                            container: [
                                [{ header: "1" }, { header: "2" }, { font: [] }],
                                [{ size: [] }],
                                ["bold", "italic", "underline", "strike", "blockquote"],
                                [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                    { indent: "-1" },
                                    { indent: "+1" },
                                ],
                                ["link", "image", "video"],
                                ["code-block"],
                                ["clean"],
                            ],
                        },
                        clipboard: {
                            matchVisual: false,
                        },
                    }}
                    formats={[
                        "header",
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "blockquote",
                        "list",
                        "bullet",
                        "indent",
                        "link",
                        "image",
                        "video",
                        "code-block",
                    ]}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <button className="btn" type="submit" onClick={handleSubmit}  >Save</button>

            <span className='in-title'>Price:
                <textarea className='price'
                    onChange={handlePriceChange}
                    value={price}
                    autoComplete="price"
                    placeholder=""
                    required />
            </span>
        </div>

    );
};

export default ClientComponent;
