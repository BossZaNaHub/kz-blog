
const Layout = ({ children}: {children: React.ReactNode}) => {
    return (
        <>
        {/* <div className="relative overflow-x-clip">
            <div className="absolute -top-32 -right-32 z-10">
                <img src="icon/circle.svg" alt="circle" />
            </div>
        </div> */}
        {children}
        {/* <div className="absolute top-1/2 -left-36 z-10">
            <img src="icon/circle.svg" alt="circle" />
        </div>
        <div className="relative overflow-x-clip">
            <div className="absolute -bottom-10 -right-20 z-10">
                <img src="icon/circle.svg" alt="circle" />
            </div>
        </div> */}
        </>
    )
}

export default Layout