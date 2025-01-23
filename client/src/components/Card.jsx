export default function Card() {
    return <>
        <section className="container max-w-fit px-2 py-2  flex flex-col bg-red-100">
            <div>
               <img className="size-80 rounded" src="https://www.baitainmontagna.com/wp-content/uploads/2019/02/differenza-baita-chalet.jpeg" alt="" />
            </div>
            <div>
                <div className="flex gap-6 justify-between">
                    <span className="font-bold">Lancashire, Regno Unito</span>
                    <span>stelline</span>
                </div>
                <p>Host: Luigi</p>
                <p>21-26 maggio</p>
                <p><span className="font-bold">1000$</span> notte</p>
            </div>
        </section>
    </>
}