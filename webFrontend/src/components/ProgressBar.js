import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function ProgressBar({step1,step2,step3,step4}) {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1? (<LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                    ):<Nav.Link disabled>Login</Nav.Link>
                }
        </Nav.Item>
        <Nav.Item>
            {step2? (<LinkContainer to='/login/shipping'>
                <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
                    ):<Nav.Link disabled>Shipping</Nav.Link>
                }
        </Nav.Item>
        <Nav.Item>
            {step3? (<LinkContainer to='/Payment'>
                <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
                    ):<Nav.Link disabled>Payment</Nav.Link>
                }
        </Nav.Item>
        <Nav.Item>
            {step4? (<LinkContainer to='/checkout'>
                <Nav.Link>CheckOut</Nav.Link>
                </LinkContainer>
                    ):<Nav.Link disabled>CheckOut</Nav.Link>
                }
        </Nav.Item>
    </Nav>
  )
}

export default ProgressBar