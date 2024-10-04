import Image from "next/image";

export const WelcomeContent = () => {

    return(  
        <>
            <Image
                src="/logo.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2">
                    Follow along the quickstart guide here: [LINK]
                </li>
                <li className="mb-2">
                    Reach out to us on {""}
                    <a 
                    href="https://github.com/orgs/NillionNetwork/discussions"
                    target="_blank" 
                    className="underline"
                    rel="noopener noreferrer">
                    Github Discussions 
                    </a> 
                    {""} if you get stuck
                </li> 
                <li className="mb-2">
                    Make sure you are running 
                    <code className="bg-gray-700 rounded-md p-1 mx-1">
                        nillion-devnet
                    </code> 
                    in your terminal
                </li>       
            </ol>
        </> 
    )
}