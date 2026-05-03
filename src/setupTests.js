import '@testing-library/jest-dom';

// Mock scrollIntoView since JSDOM doesn't implement it
window.HTMLElement.prototype.scrollIntoView = function() {};
