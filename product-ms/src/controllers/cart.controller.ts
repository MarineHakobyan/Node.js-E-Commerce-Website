import { CartService } from '../services/cart.service';

export class CartController {
    private cartService = new CartService();

    async addToCart(userId: number, productId: number) {
        return this.cartService.addToCart(userId, productId);
    }

    async getCart(userId: number) {
        return this.cartService.getCart(userId);
    }

    async deleteFromCart(userId: number, productId: number) {
        return this.cartService.removeFromCart(userId, productId);
    }
}
