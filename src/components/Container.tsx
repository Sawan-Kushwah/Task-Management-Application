import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className='max-w-[90%] m-auto'> {children}</div>
    )
}

export default Container