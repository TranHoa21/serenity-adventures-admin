/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react";
import Image from "next/image";
import avatar from "../../../public/img/user_1177568.png"
import "../../style/user/style.scss"
type Props = {};
type Payment = {
  name: string;
  email: string;
  phonenumber: number;
  role: boolean;
  avatar: string;
};


function UsersPage({ }: Props) {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serenity-adventures-demo.onrender.com/api/v1/user');
        const data = response.data;
        console.log("check data", data)
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="user-container">
      <h2 className="userTitle">User</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.name}>
              <td>
                <div className="user">
                  {user.avatar ? (
                    <Image src={user.avatar} alt="" width={40} height={40} className="userImg" />
                  ) : (
                    <Image src='https://res.cloudinary.com/dhjrrk4pg/image/upload/v1715060332/user_1177568_mxilzq.png' alt="" width={40} height={40} className="userImg" />
                  )}
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td>{user.role ? 'Admin' : 'Client'}</td>
              <td>
                <button className='delete'> Delete </button>
                <button className='update'> Update </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}


export default UsersPage
