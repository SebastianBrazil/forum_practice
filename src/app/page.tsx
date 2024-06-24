'use client'

export default function page() {
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

        if (data.firstN.length >= 100 || data.lastN.length >= 100 || data.address.length >= 100) {
            return "bruh";
        }

        // else if() {

        // }



        else {
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
            // console.log(response);

            if (result) {
                alert("Form Data Submitted Successfully");
            } else {
                alert("Form Data Failed To Submit");
            }
        }
    }
    return (
        <>
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="First Name">First Name</label>
                        <input className="border border-black" type="text" id="firstN" name="firstN" required />
                    </div>

                    <div>
                        <label htmlFor="Last Name">Last Name</label>
                        <input className="border border-black" type="text" id="lastN" name="lastN" required />
                    </div>

                    <div>
                        <label htmlFor="Email">Email</label>
                        <input className="border border-black" type="text" id="email" name="email" required />
                    </div>

                    <div>
                        <label htmlFor="Date of Birth">Date of Birth</label>
                        <input className="border border-black" type="text" id="dob" name="dob" required />
                    </div>

                    <div>
                        <label htmlFor="Address">Address</label>
                        <input className="border border-black" type="text" id="address" name="address" />
                    </div>

                    <div>
                        <label htmlFor="Phone Number">Phone Number</label>
                        <input className="border border-black" type="text" id="phoneN" name="phoneN" />
                    </div>

                    <div>
                        <label htmlFor="Password">Password</label>
                        <input className="border border-black" type="text" id="password" name="password" required />
                    </div>

                    <div>
                        <label htmlFor="Confirm Password">Confirm Password</label>
                        <input className="border border-black" type="text" id="conPassword" name="conPassword" required />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}