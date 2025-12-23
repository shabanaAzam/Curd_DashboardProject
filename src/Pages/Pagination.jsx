import { Button, Col, Row, } from "react-bootstrap";



const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

  return (
    <Row className="mt-5">
      <Col className="d-flex justify-content-center gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "primary" : "outline-primary"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </Col>
    </Row>
  );
};
export default Pagination;
