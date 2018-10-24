<?php

namespace App\Utilities;

class Pagination {

	/**
	 * @var integer
	 */
	protected $default;

	/**
	 * @var MinMax $minMax
	 */
	protected $minMax;

	/**
	 * Pagination constructor.
	 *
	 * @param integer $min
	 * @param integer $max
	 * @param integer $default
	 */
	public function __construct($min, $max, $default) {
		$this->setDefault($default);
		$this->setMinMax(new MinMax($min, $max));
	}

	/**
	 * @param $num
	 *
	 * @return integer
	 */
	public function valid($num) {
		return ($this->minMax->test($num)) ? $num : $this->default;
	}

	/**
	 * @return int
	 */
	public function getDefault() {
		return $this->default;
	}

	/**
	 * @param integer $default
	 */
	public function setDefault($default) {
		$this->default = $default;
	}

	/**
	 * @param MinMax $minMax
	 */
	public function setMinMax($minMax) {
		$this->minMax = $minMax;
	}
}