<?php

namespace App\Utilities;

class MinMax {

	/**
	 * @var integer | double
	 */
	protected $min;

	/**
	 * @var integer | double
	 */
	protected $max;

	/**
	 * NumRange constructor.
	 *
	 * @param integer | double $min
	 * @param integer | double $max
	 * @throws
	 */
	public function __construct($min, $max) {
		$this->setMin($min);
		$this->setMax($max);
	}

	/**
	 * @param integer | double $min
	 */
	public function setMin($min) {
		$this->min = (is_numeric($min)) ? $min : 0;
	}

	/**
	 * @param integer | double $max
	 */
	public function setMax($max) {
		$this->max = (is_numeric($max)) ? $max : 1;
	}

	/**
	 * @param integer | double $num
	 *
	 * @return boolean
	 */
	public function test($num) {
		return ($this->min < $num && $num < $this->max);
	}
}