import React from "react";
import { Button, Col, Container, Form, Row} from "react-bootstrap";

function BlogSorting({  
  sortType,
  setSortType,
  onReset}) {
  return (
<Container className="w-50">
    <Form >
         <Row className="g-2">
      
      <Col md={6}>
        <Form.Select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="date-new">Date: Newest</option>
          <option value="date-old">Date: Oldest</option>
          <option value="author-az">Author: A-Z</option>
          <option value="author-za">Author: Z-A</option>
        </Form.Select>
      </Col>
      <Col md={6} className="d-grid">
        <Button variant="danger" onClick={onReset}>
          Reset
        </Button>
      </Col>
      </Row>
    </Form>
    </Container>
  );
}

export default BlogSorting;
