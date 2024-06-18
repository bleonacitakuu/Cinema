import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { regs: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                lastname: event.target.lastname.value,
                birthday: event.target.birthday.value,
                email: event.target.email.value,
                password: event.target.password.value,
                logkey: event.target.logkey.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                });
    }

    render() {
        return (
            <section id="register" className="py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="card shadow-lg rounded-4 border-0">
                                <div className="card-body p-5">
                                    <h2 className="text-center mb-4 text-dark">Register</h2>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" name="name" className="form-control form-control-lg" id="name" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="lastname" className="form-label">Lastname</label>
                                            <input type="text" name="lastname" className="form-control form-control-lg" id="lastname" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="birthday" className="form-label">Birthday</label>
                                            <input type="date" name="birthday" className="form-control form-control-lg" id="birthday" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" name="email" className="form-control form-control-lg" id="email" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" name="password" className="form-control form-control-lg" id="password" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="logkey" className="form-label">Register Key</label>
                                            <input type="password" name="logkey" className="form-control form-control-lg" id="logkey" required />
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block rounded-3 mt-4">Register</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Register;
