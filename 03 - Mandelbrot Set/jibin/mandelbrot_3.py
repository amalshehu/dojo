import numpy as np
from multiprocessing import sharedctypes
from functools import partial
import multiprocessing

size = (800, 800)

mandel_plane = np.ctypeslib.as_ctypes(np.empty(size))
shared_array = sharedctypes.RawArray(mandel_plane._type_, mandel_plane)

def row_calc(i, size_x, resolution):
    tmp = np.ctypeslib.as_array(shared_array)
    
    for j in range(size[1]):

        plane_x = (i-size_x) * resolution
        plane_y = (j-size_x) * resolution

        z_r = 0
        z_i = 0
        for _ in range(100):
            temp_z_r = (z_r ** 2) - (z_i ** 2) + plane_x
            z_i = (2*z_r*z_i) + plane_y
            z_r = temp_z_r

            if abs(z_r) >= 2 or abs(z_i) >= 2:
                tmp[i][j] = 0
                break

        else:
            tmp[i][j] = 255



def find_mandel3(resolution):
    size_x = size[0]//2
    
    processes = []
    for i in range(size[1]):
        p = multiprocessing.Process(target=row_calc, args=(i, size_x, resolution))
        processes.append(p)
        p.start()

    for process in processes:
        process.join()

    return np.ctypeslib.as_array(shared_array)
