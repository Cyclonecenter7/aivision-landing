import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Что-то пошло не так</h1>
            <p className="text-[#888] mb-6">
              Страница временно недоступна. Попробуйте обновить или вернуться на главную.
            </p>
            <a href="/" className="text-blue underline">На главную</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
