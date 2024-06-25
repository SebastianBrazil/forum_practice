'use client'

export default function page() {
    const regLower = /[a-z]+/;
    const regUpper = /[A-Z]+/;
    const regNum = /[0-9]+/;
    const regSpecial = /[!\?\@\#\$\%\^\&\*]+/;

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const data = {
            firstN: event.target.firstN.value,
            lastN: event.target.lastN.value,
            email: event.target.email.value,
            dob: event.target.dob.value,
            address: event.target.address.value,
            phoneN: event.target.phoneN.value,
            password: event.target.password.value,
            conPassword: event.target.conPassword.value,
        }

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
                console.log(getNumbs);
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
            console.log("bruh first name");
            return;
        } else if (data.lastN.length >= 100) {
            console.log("bruh last name");
            return;
        } else if (data.address.length >= 100) {
            console.log("bruh address");
            return;
        } else if (data.email.indexOf('@') == -1) {
            console.log("bruh Email");
            return;
        } else if (isPhoneFormatted === false) {
            console.log("bruh Phone")
            return;
        } else if (isPasswordFormatted === false) {
            console.log("bruh Password");
            return;
        } else if (data.password !== data.conPassword) {
            console.log("bruh Confirm Password");
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
            console.log(response);
            console.log(result);

            event.target.firstN.value = "";
            event.target.lastN.value = "";
            event.target.email.value = "";
            event.target.dob.value = "";
            event.target.address.value = "";
            event.target.phoneN.value = "";
            event.target.password.value = "";
            event.target.conPassword.value = "";

            if (result) {
                alert("Form Data Submitted Successfully");
            } else {
                alert("Form Data Failed To Submit - Please Try Again");
            }
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstN">First Name</label>
                        <input className="border border-black" type="text" id="firstN" name="firstN" required />
                    </div>

                    <div>
                        <label htmlFor="lastN">Last Name</label>
                        <input className="border border-black" type="text" id="lastN" name="lastN" required />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="border border-black" type="text" id="email" name="email" required />
                    </div>

                    <div>
                        <label htmlFor="dob">Date of Birth</label>
                        <input className="border border-black" type="date" id="dob" name="dob" required />
                    </div>

                    <div>
                        <label htmlFor="address">Address</label>
                        <input className="border border-black" type="text" id="address" name="address" />
                    </div>

                    <div>
                        <label htmlFor="phoneN">Phone Number</label>
                        <input className="border border-black" type="text" id="phoneN" name="phoneN" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input className="border border-black" type="text" id="password" name="password" required />
                    </div>

                    <div>
                        <label htmlFor="conPassword">Confirm Password</label>
                        <input className="border border-black" type="text" id="conPassword" name="conPassword" required />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}