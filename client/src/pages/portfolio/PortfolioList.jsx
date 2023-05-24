import "./portfolio.css";

const PortfolioList = ({ id, title, active, setSelected }) => {
    return (
        <li
            className={active ? "portfolioList active" : "portfolioList"}
            onClick={() => setSelected(title)}
        >
            {title}
        </li>
    );
}

export default PortfolioList