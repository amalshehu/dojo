import unittest
from mandelbrot import Mandelbrot


class TestMandelbrot(unittest.TestCase):

    def setUp(self):
        self.mandelbrot = Mandelbrot(complex(5, 5), complex(10, 10))

    def test_map_plane(self):
        self.mandelbrot.map_plane((500, 800), (200, 100), (400, 600))
        self.assertEqual(self.mandelbrot.plane_low.real, 7)
        self.assertEqual(self.mandelbrot.plane_high.real, 9)
        self.assertEqual(self.mandelbrot.plane_low.imag, 5.625)
        self.assertEqual(self.mandelbrot.plane_high.imag, 8.75)

    def test_set_resolution(self):
        self.assertEqual(self.mandelbrot.resolution, (1, 1))
        self.mandelbrot.set_resolution((400,500))
        self.assertEqual(self.mandelbrot.resolution, (0.0125,0.01))


if __name__ == '__main__':
    unittest.main()
