class Mandelbrot:

    def __init__(self, plane_low, plane_high):
        self.plane_low = plane_low
        self.plane_high = plane_high

    def map_plane(self, window_size: tuple, window_low: tuple, window_high: tuple):

        real_low = (window_low[0]*self.plane_low.real) / window_size[0]
        imag_low = (window_low[1]*self.plane_low.imag)/window_size[1]

        real_high = (window_high[0]*self.plane_high.real) / window_size[0]
        imag_high = (window_high[1]*self.plane_high.imag)/window_size[1]

        self.plane_low = complex(real_low, imag_low)
        self.plane_high = complex(real_high, imag_high)
