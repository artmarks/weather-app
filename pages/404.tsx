import Link from "next/link";

export default function Custom404() {
        return (
            <>
            <div className="relative top-12">
                <div className=" text-2xl text-red-400
                flex bg-center justify-center w-full">
                    <h1>404 - Page Not Found!</h1>
                </div>
                <div className="flex justify-center">
                    <Link href="/">
                        <a>back to index</a>
                    </Link>
                </div>
            </div>
            </>
        
        )
        
  }