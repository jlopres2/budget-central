import api from "../api"

function Home() {
    const directLogin = async () => {
        window.location.href = "/login/";
    };
    const directRegister = async () => {
        window.location.href = "/register/";
    };
    return (
        <div className="h-screen flex flex-col justify-start items-center bg-gradient-to-b from-green-800 via-50% to-green-200">
            {/*Home Page Header*/}
            <header className="w-full bg-white shadow sticky top-0 z-50">
                <div className="max-w-screen-xl mx-auto px-6 py-4 grid grid-cols-3 items-center">
                    {/*Logo*/}
                    <div className="text-2xl font-bold text-gray-800 justify-self-start">PerFi</div>

                    {/*Navigation*/}
                    <nav className="hidden md:flex space-x-6 text-gray-800 justify-self-center">
                        <a href="#" className="hover:text-blue-500 transition duration-300">Home</a>
                        <a href="#" className="hover:text-blue-500 transition duration-300">About</a>
                        <a href="#" className="hover:text-blue-500 transition duration-300">Services</a>
                        <a href="#" className="hover:text-blue-500 transition duration-300">Contact</a>
                    </nav>

                    {/*Hamburger Menu for Mobile*/}
                    <button className="md:hidden text-gray-800 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    {/*Login and Register Buttons*/}
                    <div className="flex space-x-4 justify-self-end">
                        <button onClick={directLogin} 
                            className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-500 transition duration-300">
                            Login
                        </button>

                        <button onClick={directRegister} 
                            className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-500 transition duration-300">
                            Register
                        </button>
                    </div>
                </div>
            </header>
            
            {/*Main Homepage Content*/}
            <h1 className="text-4xl font-bold mb-8 mt-15">Welcome to PerFi, your personalized finance tracker.</h1>
            <div className="max-w-205 p-6 text-center space-y-5 flex flex-col items-center">
                <h2 className="text-2xl font-bold">Take Control of Your Money — Without the Headache</h2>
                {/*Description*/}
                <div className="max-w-175 space-y-5">
                    <p className="">
                        Managing your money shouldn’t feel like a second job. Our app connects to your bank and credit card 
                        accounts to give you a one-stop shop for all your transactions.
                    </p>
                    <p>
                        You can categorize your spending, see where your money is going, and build a budget that actually 
                        works — <b>no spreadsheets, no guesswork, just clarity</b>.
                    </p>
                    <p className="">
                        Whether you're budgeting for bills or saving for something big, we make personal finance 
                        simple, smart, and accessible for everyone.
                    </p>
                </div>
            </div>
            {/* Main Buttons*/}
            <div className="flex space-x-4">
                <button onClick={directRegister} 
                    className="bg-blue-700 text-white px-8 py-4 rounded hover:bg-blue-500 transition duration-300">
                    Get Started
                </button>

                <button onClick={directLogin} 
                    className="bg-gray-600 text-white px-8 py-4 rounded hover:bg-gray-500 transition duration-300">
                    Learn More
                </button>
            </div>
        </div>
    )
}

export default Home;