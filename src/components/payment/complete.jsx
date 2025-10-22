import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import Animation from "../../assets/asset/lottie/complile.json";
import { useNavigate } from 'react-router-dom';
export default function Complile ({onClose}) {
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);
    const handleCancel = ()=> {
        navigate('/dashboard');
    }
    if (!mounted) {
        return null;
    }

    return(
        <div className=" absolute top-50 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="  p-5 w-[400px] flex-row  justify-center z-10 bg-gray-100 rounded-md">
                <div className="flex justify-center">
                  {mounted && <Lottie animationData={Animation} loop={true} style={{ width: 200, height: 200 }}/>}
                </div>
                <div className="text-center flex justify-center">
                    <div className="w-[100px] p-2 rounded-sm bg-green-500 cursor-pointer hover:bg-green-600"
                    onClick={() =>handleCancel()}
                    >OK
                    </div>
                </div>
            </div>
        </div> 
    )
}