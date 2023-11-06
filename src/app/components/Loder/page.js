"use client"
import { useState } from 'react'
import './loder.css'
export default function Page({ isOpen, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        onClose();
      };

    return (
        <>
          <div>
            {isOpen && (
                <div className="modal">
                <div className="modal-content">
                <div class="spinnerbox">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    </div>
                </div>
                </div>
            )}
            </div>
        </>
    )
}
