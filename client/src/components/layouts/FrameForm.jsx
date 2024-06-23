import React from 'react'

const FrameForm = ({title="TITLE", className="",children}) => {
    return (
        <main className="flex items-center justify-center md:min-h-screen">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-10">
            <div className={`flex h-20 w-full items-end rounded-lg bg-main-5 p-3 md:h-36 ${className}`} >
              <div className=" text-white md:w-full text-2xl font-bold">
                {title}
              </div>
            </div>
            {children}
          </div>
        </main>
      );
}

export default FrameForm



  


