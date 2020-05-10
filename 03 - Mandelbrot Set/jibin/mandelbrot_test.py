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
        self.mandelbrot.set_resolution((400, 500))
        self.assertEqual(self.mandelbrot.resolution, (0.0125, 0.01))

    def test_tends_inf(self):
        self.assertEqual(self.mandelbrot.tends_inf(complex(0, 1)), False)
        self.assertEqual(self.mandelbrot.tends_inf(complex(0, 2)), True)

    def test_equ(self):
        z = complex(0, 0)
        c = complex(-1, 1)

        new_z = self.mandelbrot.equ(z, c)

        self.assertEqual(new_z, self.mandelbrot.equ(z, c))

    def test_mandel_elem(self):
        self.assertEqual(self.mandelbrot.mandel_elem(complex(0,-1)), True)
        self.assertEqual(self.mandelbrot.mandel_elem(complex(2,-1)), False)

if __name__ == '__main__':
    unittest.main()
