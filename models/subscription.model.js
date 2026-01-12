import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
        max: [10000, 'Price exceeds maximum limit'],
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'INR'],
        default: 'INR',
    },
    frequency: {
        type: String,
        required: [true, 'Frequency is required'],
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['sports', 'entertainment', 'education', 'health', 'technology'],
        default: 'technology',
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Start date cannot be in the future',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date',
        }
    },

}, { timestamps: true });


subscriptionSchema.pre('save', function (next) {

    // Automatically set renewal date if not provided
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]); // Calculate renewal date based on frequency
    }

    // Automatically set status based on renewal date
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});