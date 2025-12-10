export default function Login()
{
    return (
        <div className="flex flex-row min-h-screen w-screen">
            <div className="flex flex-1 flex-col bg-gray-100 py-10 px-20">
                <div className="flex-none">
                <div className="inline-block px-4 py-2 h-20 w-40 border">Label</div>
                </div>

                <div className="flex flex-1 max-w-[540px] flex-col justify-center pb-10 gap-2 px-20">
                <div className="flex flex-col text-center pb-4">
                    <h1>Welcome Back!</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor
                    </p>
                </div>

                <label className="text-left">Email</label>
                <input className="py-2 px-3 border border-gray-400 rounded-md" type="email" placeholder="Enter your Email" />
                <label className="text-left">Password</label>
                <input className="py-2 px-3 border border-gray-400 rounded-md" type="email" placeholder="Enter your Password" />
                <button className="py-2 px-3 bg-gray-500 rounded-md mt-2">Log In</button>
                </div>
            </div>

            <div className="flex basis-[52vw] bg-gray-100 justify-center items-center p-5">
                <section className="h-full w-full object-fill bg-gray-200 rounded-xl">
                </section>
            </div>
        </div>
    );
}