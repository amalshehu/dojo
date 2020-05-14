# for 800 x 800 with 100 iterations for each point
# v1-> 8.6 (for loops). v2 -> 5.8 (numpy with complex), v3 -> 8.5 (numpy with tuples), v4 -> (memoized with sets)
# v5->3.1(without memoization)

import numpy as np

size = (800, 800)

mandel_plane = np.empty(size)

x1, y1, x2, y2 = -2, -2, 2, 2


def find_mandel(resolution):
    size_x = size[0]//2
    size_y = size[0]//2
    for i in range(size[0]):
        for j in range(size[1]):
            plane_x = (i-size_x) * resolution
            plane_y = (j-size_y) * resolution

            z_r = 0
            z_i = 0
            for _ in range(100):
                temp_z_r = (z_r ** 2) - (z_i ** 2) + plane_x
                z_i = (2*z_r*z_i) + plane_y
                z_r = temp_z_r

                if abs(z_r) >= 2 or abs(z_i) >= 2:
                    mandel_plane[i][j] = 0
                    break

            else:
                mandel_plane[i][j] = 255

    return mandel_plane


def find_mandel2(resolution):
    size_x = size[0]//2
    size_y = size[0]//2
    for i in range(-size_x, size_x):
        for j in range(-size_y, size_y):
            plane_x = (i) * resolution
            plane_y = (j) * resolution

            z_r = 0
            z_i = 0
            for _ in range(100):
                temp_z_r = (z_r ** 2) - (z_i ** 2) + plane_x
                z_i = (2*z_r*z_i) + plane_y
                z_r = temp_z_r

                if abs(z_r) >= 2 or abs(z_i) >= 2:
                    mandel_plane[i][j] = 0
                    break

            else:
                mandel_plane[i][j] = 255

    return mandel_plane

