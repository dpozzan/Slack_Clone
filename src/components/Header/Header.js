import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useEffect } from "react";
import classes from "./Header.module.scss";
import { MenuButtonFill } from "react-bootstrap-icons";
import { Tree } from "primereact/tree";
import db from "../../firebase";

const Header = () => {
  const [show, setShow] = useState(false);
  const [nodes, setNodes] = useState(null);


  const fetchData = () => {
    db.collection('api').get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = element.data();
        console.log(data.Categories)
        setNodes(data.Categories)
        
         
    });
    })
  }

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    fetchData()
    // NodeService.getTreeNodes().then((data) => setNodes(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Navbar className={classes.bgPurple}>
        <MenuButtonFill
          className={classes.menuBtn}
          color="#625DF5"
          size={40}
          onClick={handleShow}
        />

        <Offcanvas backdrop={false} show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Slack Clone</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Tree value={nodes} />
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    </>
  );
};

export default Header;
