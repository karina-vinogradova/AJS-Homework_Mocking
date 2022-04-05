import getLevel from '../app';
import fetchData from '../http';

jest.mock('../http.js');

beforeEach(() => {
  jest.resetAllMocks();
});

test('checking response status', () => {
  fetchData.mockReturnValue({
    status: 'ok',
  });
  getLevel(1);
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('testing error', () => {
  fetchData.mockReturnValue({
    status: 'not ok',
  });
  const result = getLevel(1);
  expect(result).toEqual('Информация об уровне временно недоступна');
});

test('checking level', () => {
  fetchData.mockReturnValue({
    status: 'ok',
    level: 100,
  });
  const result = getLevel(1);
  expect(result).toEqual('Ваш текущий уровень: 100');
});
