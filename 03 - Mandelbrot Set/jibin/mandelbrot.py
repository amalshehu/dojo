class Mandelbrot:

    def __init__(self, plane_low, plane_high):
        self.plane_low = plane_low
        self.plane_high = plane_high

    def map_plane(self, window_size: tuple, window_low: tuple, window_high: tuple):

        plane_width = (self.plane_high.real - self.plane_low.real)
        plane_height = (self.plane_high.imag - self.plane_low.imag)

        plane_real_low, plane_imag_low = self.plane_low.real, self.plane_low.imag

        real_low = (window_low[0]*plane_width) / window_size[0]
        imag_low = (window_low[1]*plane_height) / window_size[1]

        real_high = (window_high[0]*plane_width) / window_size[0]
        imag_high = (window_high[1]*plane_height) / window_size[1]

        self.plane_low = complex(plane_real_low + real_low, plane_imag_low + imag_low)
        self.plane_high = complex(plane_real_low + real_high, plane_imag_low + imag_high)
