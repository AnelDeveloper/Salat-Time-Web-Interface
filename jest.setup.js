global.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
  
    observe() {
      this.callback([{ isIntersecting: true }]);
    }
  
    unobserve() {
    }
  
    disconnect() {
    }
  };

  jest.mock('jspdf', () => ({
    jsPDF: jest.fn().mockImplementation(() => ({
      save: jest.fn(),
    })),
  }));
  