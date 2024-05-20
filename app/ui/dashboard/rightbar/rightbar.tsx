
import "../../../style/dashboard/rightbar.scss"
import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md"
export default function Rightbar() {
    return (
        <div className="rightbar-container">
            <div className="rightbar-item">
                <div className="bgContainer">
                    <Image src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1715060321/astronaut_zeqszr.png" alt="" fill className="bgImage" />
                </div>
                <div className="rb-texts">
                    <span className="notification">
                        🔥 Available Now
                    </span>
                    <h3 className="rb-title">How to use the new version of the admin dashboard?</h3>
                    <span className="rb-subtitle">Takes 4 minutes to learn</span>
                    <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eius libero perspiciatis recusandae possimus</p>
                    <button className="rb-button">
                        <MdPlayCircleFilled />
                        Watch
                    </button>
                </div>
            </div>

        </div>
    );
}
