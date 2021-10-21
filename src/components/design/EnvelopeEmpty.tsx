import React, { ReactElement } from "react"

const EnvelopeEmpty = ({ className }: { className: string }): ReactElement => {
    return (
        <div className={className}>
            <svg width="100%" viewBox="0 0 64 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="42" rx="5" fill="#F3964A" />
                <path d="M7.04243 8.3834C4.763 6.64095 5.99523 3 8.86436 3H54.8639C57.7606 3 58.9752 6.69882 56.6424 8.41601L33.2086 25.6659C32.1347 26.4564 30.6678 26.4431 29.6083 25.6332L7.04243 8.3834Z" fill="white" />
            </svg>

        </div>
    )
}

export default EnvelopeEmpty