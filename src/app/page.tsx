'use client'

export default function page() {
    const handleSubmit = async (event:any) => {
        event.preventDefault()

        const data = {
            firstN: event.target.firstN.value,
            lastN: event.target.lastN.value,
            // email: event.target.email.value,
            // dob: event.target.dob.value,
            // address: event.target.address.value,
            // phoneN: event.target.phoneN.value,
            // password: event.target.password.value,
            // conPassword: event.target.conPassword.value,
        }
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

        if(result){
            alert("Form Data Submitted Successfully");
        }else{
            alert("Form Data Failed To Submit");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="First Name">First Name</label>
            <input type="text" id="first" name="firstN" required />

            <label htmlFor="Last Name">Last Name</label>
            <input type="text" id="last" name="lastN" required />

            <label htmlFor="Last Name">Last Name</label>
            <input type="text" id="last" name="lastN" required />

            <label htmlFor="Last Name">Last Name</label>
            <input type="text" id="last" name="lastN" required />

            <label htmlFor="Last Name">Last Name</label>
            <input type="text" id="last" name="lastN" required />

            <label htmlFor="Last Name">Last Name</label>
            <input type="text" id="last" name="lastN" required />

            <label htmlFor="Last Name">Last Name</label>
            <input type="text" id="last" name="lastN" required />

            <button type="submit">Submit</button>
        </form>
    )
}