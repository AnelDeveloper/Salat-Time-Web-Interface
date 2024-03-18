global.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
  
    observe() {
      this.callback([{ isIntersecting: true }]);
    }
  
    unobserve() {
      // You can add logic here if needed for cleanup
    }
  
    disconnect() {
      // You can add logic here if needed for cleanup
    }
  };

  jest.mock('jspdf', () => ({
    jsPDF: jest.fn().mockImplementation(() => ({
      save: jest.fn(),
    })),
  }));
  