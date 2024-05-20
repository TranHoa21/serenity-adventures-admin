"use client"

import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/sidebar/sidebarchat";
import MessageContainer from "../../../components/message/MessageContainer"


import "../../style/chat/style.scss";

export default function Chat() {




    return (

        < div className="chat-container">
            <Sidebar />
            <MessageContainer />
        </div>

    );
}