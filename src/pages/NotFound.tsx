import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="page-not-found">
      <Container>
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-text">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button to="/" size="lg">
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
