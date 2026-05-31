import { http } from '@/lib/http';
import { createUser, getUserByFirebaseUuid } from '@/services/user.service';
import type { ApiError } from '@/utils/errors';

jest.mock('@/lib/http', () => ({
  http: { get: jest.fn(), post: jest.fn() },
}));

const mockHttp = http as unknown as { get: jest.Mock; post: jest.Mock };

const apiError = (status: number): ApiError => ({
  status,
  message: 'x',
  isNetworkError: false,
});

describe('user.service', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getUserByFirebaseUuid passes the uid and returns data', async () => {
    mockHttp.get.mockResolvedValue({ data: { id: '1', fullName: 'Ada', email: 'a@b.c', role: 'USER' } });
    const user = await getUserByFirebaseUuid('uid-1');
    expect(mockHttp.get).toHaveBeenCalledWith('/user', { params: { firebaseUuid: 'uid-1' } });
    expect(user?.fullName).toBe('Ada');
  });

  test('getUserByFirebaseUuid returns null on 404', async () => {
    mockHttp.get.mockRejectedValue(apiError(404));
    await expect(getUserByFirebaseUuid('missing')).resolves.toBeNull();
  });

  test('getUserByFirebaseUuid rethrows non-404 errors', async () => {
    mockHttp.get.mockRejectedValue(apiError(500));
    await expect(getUserByFirebaseUuid('x')).rejects.toMatchObject({ status: 500 });
  });

  test('createUser posts the body', async () => {
    mockHttp.post.mockResolvedValue({ data: { id: '2', fullName: 'Bo', email: 'b@b.c', role: 'USER' } });
    const body = {
      fullName: 'Bo',
      email: 'b@b.c',
      role: 'USER',
      description: 'hi',
      firebaseUuid: 'uid-2',
    };
    const user = await createUser(body);
    expect(mockHttp.post).toHaveBeenCalledWith('/user', body);
    expect(user.id).toBe('2');
  });
});
