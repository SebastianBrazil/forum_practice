'use client'

import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useRef, useState } from "react";
import { FormData } from "./interfaces/interfaces";
import hank from "./assets/hank.png"
import ModalComponent from "./Components/ModalComponent";

export default function Home() {
    const regLower = /[a-z]+/;
    const regUpper = /[A-Z]+/;
    const regNum = /[0-9]+/;
    const regSpecial = /[!\?\@\#\$\%\^\&\*]+/;
    const getToday = today(getLocalTimeZone());
    const [todaysDate, setTodaysDate] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (getToday.month.toString().length === 1) {
            setTodaysDate(getToday.year.toString() + "-0" + getToday.month.toString() + "-" + getToday.day.toString())
        } else {
            setTodaysDate(getToday.year.toString() + "-" + getToday.month.toString() + "-" + getToday.day.toString())
        }
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data: FormData = {
            firstN: (event.currentTarget.elements.namedItem('firstN') as HTMLInputElement).value,
            lastN: (event.currentTarget.elements.namedItem('lastN') as HTMLInputElement).value,
            email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
            dob: (event.currentTarget.elements.namedItem('dob') as HTMLInputElement).value,
            address: (event.currentTarget.elements.namedItem('address') as HTMLInputElement).value,
            phoneN: (event.currentTarget.elements.namedItem('phoneN') as HTMLInputElement).value,
            password: (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value,
            conPassword: (event.currentTarget.elements.namedItem('conPassword') as HTMLInputElement).value,
        };

        let isPhoneFormatted: boolean = false;
        if (data.phoneN[0] == "(" && data.phoneN[4] == ")" && data.phoneN[5] == "-" && data.phoneN[9] == "-") {
            const splitStr = data.phoneN.split("");
            let getNumbs: string[] = [];

            splitStr.map((char: string) => {
                if (regNum.test(char)) {
                    getNumbs.push(char);
                }
            })

            if (getNumbs.length == 10) {
                isPhoneFormatted = true;
            }
        } else if (data.phoneN === "") {
            isPhoneFormatted = true;
        }

        let isPasswordFormatted: boolean = false;
        if (data.password.length >= 15) {
            const choppedPassword = data.password.split("");
            const extraCharArr: string[] = []

            choppedPassword.map((char: string) => {
                if (regUpper.test(char) === false && regNum.test(char) === false && regSpecial.test(char) === false && regLower.test(char) === false) {
                    extraCharArr.push(char);
                }
            })

            if (extraCharArr.length === 0) {
                isPasswordFormatted = true;
            }
        }

        if (data.firstN.length >= 100) {
            setIsModalOpen(true);
            setModalText("Please Input A First Name Less Than 100 Characters");
            return;
        } else if (data.lastN.length >= 100) {
            setIsModalOpen(true);
            setModalText("Please Input A Last Name Less Than 100 Characters");
            return;
        } else if (data.address.length >= 100) {
            setIsModalOpen(true);
            setModalText("Please Input An Address Less Than 100 Characters");
            return;
        } else if (data.email.indexOf('@') == -1) {
            setIsModalOpen(true);
            setModalText("Please Input A Valid Email (Include @)");
            return;
        } else if (isPhoneFormatted === false) {
            setIsModalOpen(true);
            setModalText("Please Input A Phone Number In The Following Format: (123)-456-7890");
            return;
        } else if (isPasswordFormatted === false) {
            setIsModalOpen(true);
            setModalText("Please Input A Password That Is 15 Characters Or Longer, With 1 Uppercase Letter, 1 Special Character, and 1 Number");
            return;
        } else if (data.password !== data.conPassword) {
            setIsModalOpen(true);
            setModalText("Please Make Sure Passwords Match");
            return;
        } else {
            const JSONdata = JSON.stringify(data)

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            }

            const response = await fetch('/api/form', options)
            const result = await response.json()

            if (formRef.current) {
                formRef.current.reset();
            }

            if (result) {
                setIsModalOpen(true);
                setModalText("Form Data Submitted Successfully");
            } else {
                setIsModalOpen(true);
                setModalText("Form Data Failed To Submit - Please Try Again");
            }
        }
    }

    return (
        <>
            <div className="h-full min-h-screen">
                {isModalOpen && modalText && <ModalComponent setIsModalOpen={setIsModalOpen} setModalText={setModalText} modalText={modalText} />}
                <div className="flex justify-around pt-20">
                    <div>
                        <img width={640} height={420} className="w-[640px] h-[420px]" src={hank.src} alt="Mr. Hank" />
                    </div>
                    <div className=" border-4 w-[640px] border-white flex justify-center text-white">
                        <form className="mt-6" ref={formRef} onSubmit={handleSubmit}>
                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="firstN">First Name: </label>
                                <input placeholder="Required" className="border w-40 pl-2 border-black text-black" type="text" id="firstN" name="firstN" required />
                            </div>

                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="lastN">Last Name: </label>
                                <input placeholder="Required" className="border w-40 pl-2 border-black text-black" type="text" id="lastN" name="lastN" required />
                            </div>

                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="email">Email: </label>
                                <input placeholder="Required" className="border w-40 pl-2 border-black text-black" type="email" id="email" name="email" required />
                            </div>

                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="dob">Date of Birth: </label>
                                <input placeholder="Required" min="1900-01-01" max={todaysDate} className="border w-40 pl-2 border-black text-black" type="date" id="dob" name="dob" required />
                            </div>

                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="address">Address: </label>
                                <input placeholder="Optional" className="border w-40 pl-2 border-black text-black" type="text" id="address" name="address" />
                            </div>

                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="phoneN">Phone Number: </label>
                                <input placeholder="Optional" className="border w-40 pl-2 border-black text-black" type="tel" id="phoneN" name="phoneN" />
                            </div>

                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="password">Password: </label>
                                <input placeholder="Required" className="border w-40 pl-2 border-black text-black" type="password" id="password" name="password" required />
                            </div>

                            <div className="w-96 mb-4 flex justify-between">
                                <label htmlFor="conPassword">Confirm Password: </label>
                                <input placeholder="Required" className="border w-40 pl-2 border-black text-black" type="password" id="conPassword" name="conPassword" required />
                            </div>

                            <div className="flex justify-center">
                                <button className="bg-white text-black w-32 mt-2" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}