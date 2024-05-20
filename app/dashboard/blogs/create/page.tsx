"use client"

import React, { useState, useRef, ChangeEvent, FormEvent, } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "../../../style/blog/create.scss";
import { Delta, DeltaOperation } from 'quill';
import 'react-quill/dist/quill.snow.css';

const ClientComponent = () => {
    const reactQuillRef = useRef<ReactQuill>(null);
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [reviewImageUrl, setPreviewImageUrl] = useState(''); // Thay đổi kiểu dữ liệu của state image

    const [selectedImageAlt, setSelectedImageAlt] = useState('');
    const router = useRouter();






    const onChange = (newValue: string, delta: any, source: any, editor: any) => {
        if (source === 'user') {
            setValue(newValue); // Update editorValue
            const text = editor?.getText() || '';
            setContent(text); // Update description
        }
    };

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
            const imageUrl = URL.createObjectURL(file); // Tạo đường dẫn URL từ file
            setPreviewImageUrl(imageUrl); // Lưu đường dẫn URL vào state
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', value);
            formData.append('description', description);
            if (image) {
                formData.append('file', image); // Sửa 'image' thành 'file'
            }

            const response = await axios.post('https://serenity-adventures-demo.onrender.com//api/v1/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Đảm bảo cài đặt 'Content-Type' là 'multipart/form-data'
                }
            });
            console.log('check:', title, content, value, image);
            router.push('/blogs');
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };




    return (

        <div className="create">
            <h1>Create New Tour  </h1>

            <span className="in-title" >Title:
                <textarea
                    value={title}
                    onChange={handleTitleChange}
                    autoComplete="title"
                    placeholder=""
                    required />
            </span>

            <img src={reviewImageUrl} className="img-blog" />
            <input
                className="image-file"
                type="file"
                name="image"
                onChange={handleImageChange}
            />

            <div>
                <span className="sp-description">Description:
                    <textarea
                        className="inputText"
                        value={description}
                        onChange={handleDescriptionChange}
                        autoComplete="description"
                        placeholder=""
                        required />
                </span>


            </div>


            <div className="content">
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

        </div>

    );
};

export default ClientComponent;
