import running from "../assets/running.png";
import notRunning from "../assets/not-running.png";
import total from "../assets/total.png";

function Home() {
    return (
        <>
            <div className="flex gap-2 min-w-[1000px]">
                <div className="flex items-center border rounded-lg h-[60px] px-2">
                    <div className="mr-1">
                        <img src={total} alt="전체차량" className="bg-green-500 rounded-full mr-1" />
                    </div>
                    <div>
                        <span className="font-bold opacity-60 mr-1">2000</span>
                        <span className="text-[10px] opacity-50">전체 차량</span>
                    </div>
                </div>
                <div className="flex items-center border rounded-lg h-[60px] px-2">
                    <div className="mr-1">
                        <img src={notRunning} alt="미운행중" />
                    </div>
                    <div>
                        <div>
                            <span className="font-bold opacity-60 mr-1">51%</span>
                            <span className="text-sm opacity-50 text-[10px]">미운행 차량 (1,001)</span>
                        </div>
                        {/* <div>빨간색 막대기</div> */}
                    </div>
                </div>
                <div>
                    <div>
                        <img src={running} alt="운행중" />
                    </div>
                    <div>
                        <div>
                            <span>49%</span>
                            <span>운행 중 차량 (999)</span>
                        </div>
                        {/* <div>파란색 막대기</div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;