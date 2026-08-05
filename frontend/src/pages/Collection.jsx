import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';



const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])

  const [recipient, setRecipient] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])

  const [sortType, setSortType] = useState('relavent')


  // =========================
  // CATEGORY STRUCTURE
  // =========================

  const categoryData = {
    Men: {
      Apparel: ['Topwear', 'Bottomwear', 'Winterwear'],
      Footwear: ['Sneakers', 'Formal Shoes', 'Sandals', 'Boots'],
    },

    Women: {
      Apparel: ['Topwear', 'Bottomwear', 'Winterwear'],
      Footwear: ['Sneakers', 'Heels', 'Sandals', 'Boots'],
      Jewellery: ['Necklaces', 'Earrings', 'Bracelets', 'Rings'],
    },

    Kids: {
      Apparel: ['Topwear', 'Bottomwear', 'Winterwear'],
      Footwear: ['Sneakers', 'Sandals', 'School Shoes'],
      Toys: ['Action Figures', 'Dolls', 'Educational Toys', 'Games'],
    },
  }


  // =========================
  // TOGGLE RECIPIENT
  // =========================

  const toggleRecipient = (e) => {

    const value = e.target.value

    if (recipient.includes(value)) {
      setRecipient(prev => prev.filter(item => item !== value))
    } else {
      setRecipient(prev => [...prev, value])
    }

  }


  // =========================
  // TOGGLE CATEGORY
  // =========================

  const toggleCategory = (e) => {

    const value = e.target.value

    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value))
    } else {
      setCategory(prev => [...prev, value])
    }

  }


  // =========================
  // TOGGLE SUB CATEGORY
  // =========================

  const toggleSubCategory = (e) => {

    const value = e.target.value

    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value))
    } else {
      setSubCategory(prev => [...prev, value])
    }

  }


  // =========================
  // APPLY FILTER
  // =========================

  const applyFilter = () => {

    let productsCopy = products.slice()

    // Search
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }


    // Recipient
    if (recipient.length > 0) {
      productsCopy = productsCopy.filter(item =>
        recipient.includes(item.recipient)
      )
    }


    // Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      )
    }


    // Sub Category
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }


    setFilterProducts(productsCopy)
  }


  // =========================
  // SORT PRODUCTS
  // =========================

  const sortProduct = () => {

    let fpCopy = filterProducts.slice()

    switch (sortType) {

      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price)
        setFilterProducts(fpCopy)
        break

      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price)
        setFilterProducts(fpCopy)
        break

      default:
        applyFilter()
        break
    }

  }


  // =========================
  // FILTER EFFECT
  // =========================

  useEffect(() => {
    applyFilter()
  }, [
    recipient,
    category,
    subCategory,
    search,
    showSearch,
    products
  ])


  // =========================
  // SORT EFFECT
  // =========================

  useEffect(() => {
    sortProduct()
  }, [sortType])


  // =========================
  // GET AVAILABLE CATEGORIES
  // =========================

  const getAvailableCategories = () => {

    // If no recipient selected,
    // show all categories
    if (recipient.length === 0) {
      return ['Apparel', 'Footwear', 'Jewellery', 'Toys']
    }

    const availableCategories = new Set()

    recipient.forEach(person => {

      if (categoryData[person]) {

        Object.keys(categoryData[person]).forEach(cat => {
          availableCategories.add(cat)
        })

      }

    })

    return [...availableCategories]
  }


  // =========================
  // GET AVAILABLE SUB CATEGORIES
  // =========================

  const getAvailableSubCategories = () => {

    const availableSubCategories = new Set()

    // If recipients selected
    if (recipient.length > 0) {

      recipient.forEach(person => {

        if (categoryData[person]) {

          Object.entries(categoryData[person]).forEach(
            ([cat, subCategories]) => {

              // If no category selected OR category is selected
              if (
                category.length === 0 ||
                category.includes(cat)
              ) {

                subCategories.forEach(sub => {
                  availableSubCategories.add(sub)
                })

              }

            }
          )

        }

      })

    } else {

      // No recipient selected
      // use all categories

      Object.values(categoryData).forEach(personCategories => {

        Object.entries(personCategories).forEach(
          ([cat, subCategories]) => {

            if (
              category.length === 0 ||
              category.includes(cat)
            ) {

              subCategories.forEach(sub => {
                availableSubCategories.add(sub)
              })

            }

          }
        )

      })

    }

    return [...availableSubCategories]
  }


  const availableCategories = getAvailableCategories()
  const availableSubCategories = getAvailableSubCategories()


  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pt-8 sm:pt-10 border-t">

      {/* =========================
          FILTER OPTIONS
      ========================= */}

      <div className="w-full lg:w-64 lg:min-w-64">

        <p
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center justify-between border rounded-lg px-4 py-3 lg:hidden cursor-pointer"
        >
          <span>Filters</span>

          <img
              src={assets.dropdown_icon}
              className={`w-4 transition-transform ${
                  showFilter ? "rotate-90" : ""
              }`}
              alt=""
          />
        </p>


        {/* =========================
            RECIPIENT FILTER
        ========================= */}

        <div
            className={`border rounded-lg border-gray-300 p-5 mt-4 bg-white ${
            showFilter ? "" : "hidden"
          } lg:block`}
        >

          <p className='mb-3 text-sm font-medium'>
            RECIPIENT
          </p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <label className='flex gap-2 cursor-pointer'>
              <input
                className="w-4 h-4 accent-[#4B072B]"
                type='checkbox'
                value='Men'
                checked={recipient.includes('Men')}
                onChange={toggleRecipient}
              />
              Men
            </label>

            <label className='flex gap-2 cursor-pointer'>
              <input
                className="w-4 h-4 accent-[#4B072B]"
                type='checkbox'
                value='Women'
                checked={recipient.includes('Women')}
                onChange={toggleRecipient}
              />
              Women
            </label>

            <label className='flex gap-2 cursor-pointer'>
              <input
                className="w-4 h-4 accent-[#4B072B]"
                type='checkbox'
                value='Kids'
                checked={recipient.includes('Kids')}
                onChange={toggleRecipient}
              />
              Kids
            </label>

          </div>

        </div>


        {/* =========================
            CATEGORY FILTER
        ========================= */}

        <div
          className={`border rounded-lg border-gray-300 p-5 mt-4 bg-white ${
            showFilter ? "" : "hidden"
          } lg:block`}
        >

          <p className='mb-3 text-sm font-medium'>
            CATEGORY
          </p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            {availableCategories.map((cat) => (

              <label
                key={cat}
                className='flex gap-2 cursor-pointer'
              >

                <input
                  className="w-4 h-4 accent-[#4B072B]"
                  type='checkbox'
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />

                {cat}

              </label>

            ))}

          </div>

        </div>


        {/* =========================
            SUB CATEGORY FILTER
        ========================= */}

        <div
          className={`border rounded-lg border-gray-300 p-5 mt-4 bg-white ${
            showFilter ? "" : "hidden"
          } lg:block`}
        >

          <p className='mb-3 text-sm font-medium'>
            TYPE
          </p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            {availableSubCategories.map((sub) => (

              <label
                key={sub}
                className='flex gap-2 cursor-pointer'
              >

                <input
                  className="w-4 h-4 accent-[#4B072B]"
                  type='checkbox'
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={toggleSubCategory}
                />

                {sub}

              </label>

            ))}

          </div>

        </div>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className='flex-1'>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <Title
            text1={'ALL'}
            text2={'COLLECTIONS'}
          />

          {/* SORT */}

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border rounded-md border-gray-300 px-4 py-2 text-sm w-full sm:w-56"
          >

            <option value='relavent'>
              Sort by: Relevant
            </option>

            <option value='low-high'>
              Sort by: Low to High
            </option>

            <option value='high-low'>
              Sort by: High to Low
            </option>

          </select>

        </div>


        {/* =========================
            PRODUCTS
        ========================= */}
        <p className="text-sm text-gray-500">
            {filterProducts.length} Products Found
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">

          {filterProducts.map((item, index) => (

            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />

          ))}

        </div>

      </div>

    </div>
  )
}

export default Collection