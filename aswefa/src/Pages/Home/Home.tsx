import total from "../../assets/car-status-icons/total.png";
import working from "../../assets/car-status-icons/working.png";
import notWorking from "../../assets/car-status-icons/not-working.png";
import styles from "./Home.module.css";


function Home() {
    return (
        <main>
            <div className="flex">
                <div className={`${styles["icon"]} flex items-center border rounded-xl p-[23px] h-fit`}>
                    <img className="w-10 h-10 mr-2" src={total} alt="전체 차량 아이콘" />
                    <div>
                        <div>
                            <span className="text-xl font-bold mr-2">2000</span>
                            <span className="text-xs opacity-60">전체 차량</span>
                        </div>
                        {/* <div>progress indicator</div> */}
                    </div>
                </div>
                <div className={`${styles["icon"]} flex items-center border rounded-xl p-[23px] h-fit`}>
                    <img className="w-10 h-10 mr-2" src={notWorking} alt="미운행 차량 아이콘" />
                    <div>
                        <div>
                            <span className="text-xl font-bold mr-2">51%</span>
                            <span className="text-xs opacity-60">미운행 차량 (1,001)</span>
                        </div>
                        {/* <div>progress indicator</div> */}
                    </div>
                </div>
                <div className={`${styles["icon"]} flex items-center border rounded-xl p-[23px] h-fit`}>
                    <img className="w-10 h-10 mr-2" src={working} alt="운행 차량 아이콘" />
                    <div>
                        <div>
                            <span className="text-xl font-bold mr-2">49%</span>
                            <span className="text-xs opacity-60">운행 중 차량 </span>
                        </div>
                        {/* <div>progress indicator</div> */}
                    </div>
                </div>
            </div>
            <div></div>
        </main>
        
    );
}

export default Home;