import { MouseEventHandler } from 'react';

type TButton = {
    children: React.ReactNode;
    onClick: MouseEventHandler<HTMLDivElement>;
};

const Button = ({ children, onClick }: TButton) => {
    return (
        <div className="Button" onClick={onClick}>
            {children}
        </div>
    );
};

export default Button;
