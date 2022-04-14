import React, { useEffect, useState } from 'react'
import './portfolio.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';
import PortfolioList from './PortfolioList';
import {
  featuredPortfolio,
  webPortfolio,
  mobilePortfolio,
  designPortfolio,
  contentPortfolio,
} from "../../data";
// import Modal from '../../components/Modal';
import Modal from '@mui/material/Modal';


const modalStyle = {
  position: 'absolute',
  margin: '5vh',
  top: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: '80vw',
  height: '90vh',
  backgroundColor: 'white',
  borderRadius: '10px'
}

const Portfolio = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [img, setImg] = useState();
  const [title, setTitle] = useState();
  const handleOpen = (d) => {
    setOpen(true);
    // console.log("id " + d.id);
    // console.log("title " + d.title);
    // console.log("img " + d.img);
    setId(d.id);
    setImg(d.img)
    setTitle(d.title);
  }
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState("featured");
  const [data, setData] = useState([]);
  const list = [
    {
      id: "featured",
      title: "Featured",
    },
    {
      id: "web",
      title: "Web App",
    },
    {
      id: "mobile",
      title: "Mobile App",
    },
    {
      id: "design",
      title: "Design",
    },
    {
      id: "content",
      title: "Content",
    },
  ];

  useEffect(() => {
    switch (selected) {
      case "featured":
        setData(featuredPortfolio);
        break;
      case "web":
        setData(webPortfolio);
        break;
      case "mobile":
        setData(mobilePortfolio);
        break;
      case "design":
        setData(designPortfolio);
        break;
      case "content":
        setData(contentPortfolio);
        break;
      default:
        setData(featuredPortfolio);
    }
  }, [selected]);


  const portfolioRef = useNav('Portfolio')

  return (
    <section className='portfolio' ref={portfolioRef} id='portfolioContainer'>
      <div className='portfolio-header'>
        <h1>Portfolio </h1>
      </div>
      <Modal
        open={open}
        onClose={handleClose}>
        <div className='portfolio-modal' style={modalStyle}>Modal
          <div>{id}</div>
          <img
            src={img}
            alt=""
          />
          <div> {title}</div>
        </div>

      </Modal>
      <ul >
        {list.map((item) => (
          <PortfolioList
            title={item.title}
            active={selected === item.id}
            setSelected={setSelected}
            id={item.id}
          />
        ))}
      </ul>
      <div className="portfolio-item-container">
        {data.map((d) => (
          <div className="item" onClick={() => handleOpen(d)}>
            <img
              src={d.img}
              alt=""
            />
            <h3>{d.title}</h3>
          </div>
        ))}
      </div>
    </section >
  )
}

export default Portfolio