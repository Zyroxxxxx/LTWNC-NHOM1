import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f4f9',
                padding: '20px',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    maxWidth: '500px',
                    width: '100%',
                }}
            >
                {/* Center and make icon bigger */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '20px', // Adjust spacing between icon and text
                    }}
                >
                    <FaCheckCircle size={120} color="#28a745" />
                </div>
                <h1 style={{ fontSize: '36px', color: '#28a745', margin: '20px 0' }}>Thanh toán thành công!</h1>
                <p
                    style={{
                        fontSize: '16px',
                        color: '#555',
                        marginBottom: '30px',
                        lineHeight: '1.6',
                    }}
                >
                    Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn sẽ sớm được xử lý.
                </p>
                <button
                    onClick={handleGoHome}
                    style={{
                        fontSize: '18px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '12px 25px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Tiếp tục mua sắm
                </button>
            </div>
        </div>
    );
};

export default Success;
